/**
 * This is the actual React app.
 * It should live in another file, but it's here to avoid using webpack.
 */
function App2({ appId }) {
  const { useState } = React;

  // Not using RQ or SWR to keep things simple.
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(false);

  const prefetch = async () => {
    try {
      setLoading(true);
      const res = await fetch("/app1?_rsc=1");
      const data = await res.json();
      // Loads the scripts for the subsequent app (if not already loaded).
      data?.files?.forEach((path) => {
        const src = `${data?.appId}/${path}`;
        if (document.querySelectorAll(`[src="${src}"]`).length === 0) {
          const script = document.createElement("script");
          script.src = src;
          document.body.appendChild(script);
        }
      });
      setPayload(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = () => {
    const nextAppId = payload?.appId;
    if (nextAppId) {
      // Dispatches an event to unmount the current app.
      window.dispatchEvent(new Event(`UNMOUNT_APP_${appId}`));
      // Dispatches an event to mount the next app.
      window.dispatchEvent(new Event(`SWITCH_TO_APP_${nextAppId}`));
      // Updates the URL to match the next app.
      window.history.replaceState({}, "", `/app1`);
    }
  };

  return (
    <>
      <h1>Hello from App 2</h1>
      <button onClick={prefetch} disabled={loading}>
        Prefetch App 1 Payload
      </button>
      {loading ? <p>Loading...</p> : null}
      {payload ? <button onClick={navigate}>Go to App 1</button> : null}
    </>
  );
}

/**
 * The actual main function.
 * This is mostly the same for each app, except for the `CURRENT_APP_ID` and
 * can be generated at build time.
 */
function main_456() {
  const CURRENT_APP_ID = "456";

  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<App2 appId={CURRENT_APP_ID} />);

  window.addEventListener(`UNMOUNT_APP_${CURRENT_APP_ID}`, () => {
    root.unmount();
  });
}
