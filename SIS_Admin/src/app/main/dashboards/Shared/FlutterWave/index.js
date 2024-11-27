import { Button } from "@mui/material";

const universities = ["Makut", "KNU", "BPUT", "CU", "BU"];

export default function FlutterWave({
  fieldData,
  control,
  fees,
  user,
  paymentFrom,
  registrationId,
  applicationId,
  handleSuccess=()=>{}
}) {
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: fees,
    currency: "USD",
    payment_options: "card",
    customer: {
      email: user?.email,
      phone_number: user?.userInformationId?.phone_number,
      name: user?.userInformationId?.displayName,
    },
    meta: {
      consumer_id: user?.id,
      consumer_type: paymentFrom,
      registration_id: registrationId,
      application_id: applicationId,
    },
    customizations: {
      title: "Student Registration Portal",
      description: "Payment for fees/course",
      logo: "https://scool-management.netlify.app/assets/images/logo/logo.png",
    },
  };
  const makePayment = () => {
    const modal = window.FlutterwaveCheckout({
      ...config,
      callback: (response) => {
        console.log(response);
        setTimeout(() => {
          modal.close();
          handleSuccess()
          // window.location.reload();
        }, [1000]);
      },
      onClose: () => {},
    });
  };
  // const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => makePayment()}
        disabled={fees <= 0}
      >
        Pay
      </Button>
    </>
  );
}
