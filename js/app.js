import AppController from './controllers/AppController.js';

window.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
