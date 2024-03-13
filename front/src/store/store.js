import { createPinia } from 'pinia';

export function setupStore() {
  const pinia = createPinia();
  // Aquí puedes instalar tus tiendas
  // const appStore = useAppStore(pinia);
  return { pinia };
}