// Bridge between TransitionLink and the Curtain overlay.
export const curtain: { cover?: () => Promise<void>; reveal?: () => void } = {};
