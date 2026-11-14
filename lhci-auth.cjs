/**
 * Script Puppeteer para Lighthouse CI (@lhci/cli).
 * Prepara la sesión en localStorage antes de auditar rutas protegidas por authGuard.
 */
module.exports = async (browser, context) => {
  const targetUrl = new URL(context.url);
  const origin = targetUrl.origin;
  const page = await browser.newPage();

  try {
    await page.goto(origin, { waitUntil: 'domcontentloaded' });

    if (targetUrl.pathname.endsWith('/login')) {
      await page.evaluate(() => {
        localStorage.removeItem('mokatta_jwt_token');
        localStorage.removeItem('mokatta_user');
      });
      return;
    }

    let token = 'lhci-structural-token';
    let user = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'LHCI Auditor',
      email: 'admin@mokatta.com',
      active: true,
    };

    const email = process.env.MOKATTA_EMAIL;
    const password = process.env.MOKATTA_PASSWORD;

    if (email && password) {
      try {
        const res = await fetch('https://mokattapi-production.up.railway.app/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.accessToken && data?.user) {
            token = data.accessToken;
            user = data.user;
          }
        }
      } catch (err) {
        console.warn('[lhci-auth] No se pudo autenticar contra Railway; usando token estructural:', err.message);
      }
    }

    await page.evaluate(
      (jwtToken, userInfo) => {
        localStorage.setItem('mokatta_jwt_token', jwtToken);
        localStorage.setItem('mokatta_user', JSON.stringify(userInfo));
      },
      token,
      user
    );
  } finally {
    await page.close();
  }
};
