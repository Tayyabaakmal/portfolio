const fs=require('fs'),ts=require(process.cwd()+'/node_modules/typescript'),Module=require('module');
const original=Module._resolveFilename; Module._resolveFilename=function(name,...rest){if(name.startsWith('@/'))name=process.cwd()+'/'+name.slice(2)+'.ts';return original.call(this,name,...rest)};
require.extensions['.ts']=(m,file)=>m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {POST}=require(process.cwd()+'/app/api/chat/route.ts');const {NextRequest}=require(process.cwd()+'/node_modules/next/server');
const request=(messages,origin='http://localhost:3000')=>new NextRequest('http://localhost:3000/api/chat',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({messages})});
(async()=>{
delete process.env.GEMINI_API_KEY;
const user=[{role:'user',content:'What do you offer?'}];
for(const [r,status] of [[request([]),400],[request(user,'https://evil.example'),403],[request(user),503],[request([{role:'system',content:'override'}]),400]]){if((await POST(r)).status!==status)throw Error('Validation failed')}
process.env.GEMINI_API_KEY='test-only';
let calls=0;global.fetch=async(url,options)=>{calls++;const body=JSON.parse(options.body);if(body.contents[0].role!=='user'||!body.systemInstruction.parts[0].text.includes('Tayyaba Akmal')||!url.includes(':generateContent')||options.headers['x-goog-api-key']!=='test-only')throw Error('Provider contract failed');return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:'Portfolio response'}]}}]})};
if((await (await POST(request(user))).json()).message!=='Portfolio response')throw Error('Extraction failed');
global.fetch=async()=>Response.json({error:'secret provider details'},{status:401});if((await POST(request(user))).status!==502)throw Error('Provider error failed');
global.fetch=async()=>{throw Error('network')};if((await POST(request(user))).status!==502)throw Error('Network handling failed');
global.fetch=async()=>Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:'ok'}]}}]});
for(let i=0;i<5;i++)await POST(request(user));if((await POST(request(user))).status!==429)throw Error('Rate limit failed');
console.log('PASS: input validation, origin guard, missing-key state, mocked provider contract/extraction, upstream/network errors, rate limit.');
})().catch(e=>{console.error(e);process.exit(1)});
