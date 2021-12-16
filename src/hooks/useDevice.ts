import { ref } from 'vue';
import device from 'current-device';

export const useDevice = () => {
  const deviceType = ref(device.type);
  const deviceOrientation = ref(device.orientation);
  const deviceOs = ref(device.os);

  return { deviceType, deviceOrientation, deviceOs };
}
