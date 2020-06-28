import Koa from 'koa';
import body from 'koa-body';
import logger from 'koa-logger';
import httpStatus from 'http-status';

const app = new Koa();

app.use(logger);
app.use(body);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.throw(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

app.use((ctx, next) => {
  ctx.assert(
    ctx.state.user,
    httpStatus.UNAUTHORIZED,
    'User not found. Please login!'
  );
  next();
});

export default app;
