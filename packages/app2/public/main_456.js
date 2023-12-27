function main_456() {
  const { useState } = React;

  function App2() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const prefetchApp1Payload = async () => {
      try {
        setLoading(true);
        const res = await fetch("/app1?_rsc=1");
        const payload = await res.json();
        payload?.files?.forEach((src) => {
          const script = document.createElement("script");
          script.type = "text/babel";
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
      const appId = data?.appId;
      if (appId) {
        console.log("Dispatching event ", `APP_LOAD_${appId}`);
        window.dispatchEvent(new Event(`APP_LOAD_${appId}`));
      }
    };

    return (
      <>
        <h1>Hello from App 2</h1>
        <button onClick={prefetchApp1Payload} disabled={loading}>
          Prefetch App 1 Payload
        </button>
        {loading ? <p>Loading...</p> : null}
        {data ? <button onClick={goToApp2}>Go to App 1</button> : null}
      </>
    );
  }

  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<App2 />);
}
