import { useRouter } from "next/router";
import ViewDetails from "../../components/invoice/ViewDetails";

const view = (props) => {
  const router = useRouter();

  const id = router.query.id;

  return <ViewDetails id={id} {...props} />;
};

export default view;
