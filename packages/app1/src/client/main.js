function App1({ appId }) {
  const { useState } = React;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const prefetchApp2Payload = async () => {
    try {
      setLoading(true);
      const res = await fetch("/app2?_rsc=2");
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

  const goToApp2 = () => {
    const nextAppId = data?.appId;
    if (nextAppId) {
      window.dispatchEvent(new Event(`UNMOUNT_APP_${appId}`));
      window.dispatchEvent(new Event(`SWITCH_TO_APP_${nextAppId}`));
      window.history.replaceState({}, "", `/app2`);
    }
  };

  return (
    <>
      <h1>Hello from App 1</h1>
      <button onClick={prefetchApp2Payload} disabled={loading}>
        Prefetch App 2 Payload
      </button>
      {loading ? <p>Loading...</p> : null}
      {data ? <button onClick={goToApp2}>Go to App 2</button> : null}
    </>
  );
}

function main_123() {
  const CURRENT_APP_ID = "123";

  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<App1 appId={CURRENT_APP_ID} />);

  window.addEventListener(`UNMOUNT_APP_${CURRENT_APP_ID}`, () => {
    root.unmount();
  });
}
