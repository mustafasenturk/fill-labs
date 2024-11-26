import * as Haptics from 'expo-haptics';

export function useHaptic() {
  const impact = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
    Haptics.impactAsync(style).catch((e: Error) => {
      console.error(e);
    });
  };

  return impact;
}
