import { HttpInterceptorFn } from '@angular/common/http';

export const noteApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://localhost:7210/${req.url}` });
  return next(apiReq);
};
