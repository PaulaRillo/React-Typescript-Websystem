import { ListRouter } from '../modules/list';
import { VendorRouter } from '../modules/vendor';

export const VendorsRouter = () => {
  return (
    <>
      {ListRouter()}
      {VendorRouter()}
    </>
  );
};
