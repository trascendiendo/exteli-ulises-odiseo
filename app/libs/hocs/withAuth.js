import { useIsAuthenticated } from '@/app/libs/providers/auth';

import withConditionalRedirect from './withConditionalRedirect';

export default function withAuth (WrappedComponent, location = '/login') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return !useIsAuthenticated()
    }
  })
}