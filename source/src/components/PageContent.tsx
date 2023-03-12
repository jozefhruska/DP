import React, { useState } from 'react';
import logo from '~/assets/logo.svg';
import './PageContent.css';

function PageContent(props: { children: React.ReactNode }) {
  const imageUrl = new URL(logo, import.meta.url).href;

  const [count, setCount] = useState(0);

  return (
    <div>
      <img src={imageUrl} width={20} height={20} alt="" />
      <h1>{props.children}</h1>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        XXX: {count}
      </button>
    </div>
  );
}

export default PageContent;
