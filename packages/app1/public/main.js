function main_123() {
  const { useState } = React;

  function App1() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const prefetchApp2Payload = async () => {
      try {
        setLoading(true);
        const res = await fetch("/app2?_rsc=2");
        const payload = await res.json();
        payload?.files?.forEach((src) => {
          const script = document.createElement("script");
          script.type = "text/babel";
          script.src = `${payload?.appId}/public/${src}`;
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
      const appId = data?.appId;
      if (appId) {
        console.log("Dispatching event ", `APP_LOAD_${appId}`);
        window.dispatchEvent(new Event(`APP_LOAD_${appId}`));
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

  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<App1 />);
}
