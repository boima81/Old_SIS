import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRegistration } from "app/store/singleRegistrationSlice";
import { getCourse } from "app/store/courseSlice";
import Details from "./Details";
import Header from "./Header";

function RegistrationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [appData, setAppData] = useState({});
  const [loading, setLoading] = useState(false);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  console.log({ appData });
  function getData() {
    dispatch(getRegistration(id)).then(async (action) => {
      /**
       * If the requested product is not exist show message
       */
      if (Object.keys(await action.payload).length > 0) {
        setAppData(action.payload);
      }
    });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (appData?.semesterId?.id) {
      dispatch(getCourse(appData?.semesterId?.id))?.then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, appData?.semesterId?.id]);

  return (
    <FusePageCarded
      header={<Header headerTitle="Registration Detail" />}
      content={<Details data={appData} showEditButton={false} />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default RegistrationDetails;
