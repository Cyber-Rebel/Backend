import { useEffect, useState } from "react";

let deferredPrompt;

export default function InstallApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    setShow(false);
  };

  if (!show) return null;

  return (
    <button
      onClick={installApp}
      style={{
        padding: "12px 20px",
        background: "#6366f1",
        color: "#fff",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Download App
    </button>
  );
}
