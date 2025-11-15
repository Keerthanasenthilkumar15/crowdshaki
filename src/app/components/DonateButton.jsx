import { useRouter } from 'next/navigation';

const DonateButton = ({ style, fundraiserId }) => {
  const router = useRouter();

  // Function to handle redirection to the payment page
  const handleDonateClick = () => {
    // Redirect to the payment page with the fundraiser ID as a query param
    router.push(`/payment?fundraiserId=${fundraiserId}`);
  };  

  return (
    <button className={style} onClick={handleDonateClick}>
      Donate
    </button>
  );
};

export default DonateButton;