import { useEffect } from 'react';
import { Globe, Languages, MoreVertical } from 'lucide-react';
import browser from 'webextension-polyfill';
import { PopupHeader } from '~/components/PopupHeader';
import { PopupContent } from '~/components/PopupContent';
import { AcceptLanguageForm } from '~/components/form/AcceptLanguageForm';
import * as Tabs from '../../components/common/Tabs';
import { PopupTab } from '~/types';
import '../../styles.css';
import { useStore } from '~/utilities/store';

export const App: React.FC = () => {
  useEffect(() => {
    // noinspection TypeScriptValidateJSTypes
    const unsubscribe = useStore.subscribe((store) => {
      void browser.storage.sync.set(store);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <PopupHeader />
      <PopupContent>
        <Tabs.Root defaultValue={PopupTab.ACCEPT_LANGUAGE}>
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
            User-Agent
          </Tabs.Content>

          <Tabs.Content value={PopupTab.ACCEPT_LANGUAGE}>
            <AcceptLanguageForm />
          </Tabs.Content>

          <Tabs.Content value={PopupTab.OTHER}>Other</Tabs.Content>
        </Tabs.Root>

        <p className="mt-4">
          Place the carrots in a bucket, and whisk fully with rich
          worcestershire sauce.
        </p>
      </PopupContent>
    </>
  );
};

export default App;
