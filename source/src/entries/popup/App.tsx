import { useEffect, useRef } from 'react';
import { Globe, Languages, MoreVertical } from 'lucide-react';
import browser from 'webextension-polyfill';
import { PopupHeader } from '~/components/PopupHeader';
import { PopupContent } from '~/components/PopupContent';
import { AcceptLanguageForm } from '~/components/form/AcceptLanguageForm';
import * as Tabs from '../../components/common/Tabs';
import { PopupTab, StoreValue } from '~/types';
import { isStoreInitialized, useStore } from '~/utilities/store';
import { DeviceMemoryForm } from '~/components/form/DeviceMemoryForm';
import { UserAgentForm } from '~/components/form/UserAgentForm';
import '../../styles.css';

export const App: React.FC = () => {
  const initializeStore = useStore((store) => store.initialize);

  const unsubscribe = useRef<() => void>();

  useEffect(() => {
    if (typeof unsubscribe.current === 'function') {
      unsubscribe.current();
    }

    void browser.storage.sync.get().then((store: StoreValue | {}) => {
      if (isStoreInitialized(store)) {
        initializeStore(store);
      }

      // noinspection TypeScriptValidateJSTypes
      unsubscribe.current = useStore.subscribe((store) => {
        void browser.storage.sync.set(store);
      });
    });
  }, []);

  return (
    <>
      <PopupHeader />

      <PopupContent>
        <Tabs.Root defaultValue={PopupTab.OTHER}>
          <Tabs.List>
            <Tabs.Trigger value={PopupTab.USER_AGENT}>
              <Globe className="mr-2 h-3.5 w-3.5 text-gray-500" />
              User-Agent
            </Tabs.Trigger>
            <Tabs.Trigger value={PopupTab.ACCEPT_LANGUAGE}>
              <Languages className="mr-2 h-3.5 w-3.5 text-gray-500" />
              Accept-Language
            </Tabs.Trigger>
            <Tabs.Trigger value={PopupTab.OTHER}>
              <MoreVertical className="mr-2 h-3.5 w-3.5 text-gray-500" />
              Other
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value={PopupTab.USER_AGENT}>
            <UserAgentForm />
          </Tabs.Content>

          <Tabs.Content value={PopupTab.ACCEPT_LANGUAGE}>
            <AcceptLanguageForm />
          </Tabs.Content>

          <Tabs.Content value={PopupTab.OTHER}>
            <DeviceMemoryForm />
          </Tabs.Content>
        </Tabs.Root>
      </PopupContent>
    </>
  );
};

export default App;
