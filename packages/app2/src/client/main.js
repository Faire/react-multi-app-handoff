function App2({ appId }) {
  const { useState } = React;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const prefetchApp1Payload = async () => {
    try {
      setLoading(true);
      const res = await fetch("/app1?_rsc=1");
      const payload = await res.json();
      payload?.files?.forEach((src) => {
        const script = document.createElement("script");
        script.src = `${payload?.appId}/${src}`;
        document.body.appendChild(script);
      });
      setData(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToApp1 = () => {
    const nextAppId = data?.appId;
    if (nextAppId) {
      window.dispatchEvent(new Event(`UNMOUNT_APP_${appId}`));
      window.dispatchEvent(new Event(`SWITCH_TO_APP_${nextAppId}`));
      window.history.replaceState({}, "", `/app1`);
    }
  };

  return (
    <>
      <h1>Hello from App 2</h1>
      <button onClick={prefetchApp1Payload} disabled={loading}>
        Prefetch App 1 Payload
      </button>
      {loading ? <p>Loading...</p> : null}
      {data ? <button onClick={goToApp1}>Go to App 1</button> : null}
    </>
  );
}

function main_456() {
  const CURRENT_APP_ID = "456";

  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<App2 appId={CURRENT_APP_ID} />);

  window.addEventListener(`UNMOUNT_APP_${CURRENT_APP_ID}`, () => {
    root.unmount();
  });
}
