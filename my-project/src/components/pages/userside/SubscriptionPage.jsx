
import axios from 'axios';
// import useRazorpay from 'react-razorpay/src';
import useRazorpay from 'react-razorpay'
import logoImage from '../../../assets/logo.png';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { BACKEND_BASE_URL } from '../../../utils/Config';
import { RAZORPAY_KEY } from '../../../utils/Config';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function VipPay() {
  

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState()

  const handleSubscribe = async (planId) => {
    setAmount(planId.price)
    setDuration(planId.duration)
    setLoading(true);
    razorpayPayment()
   


  }
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/api/subscription/subscription-plans/`)
      .then((response) => {
        setSubscriptionPlans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subscription plans:', error);
      });
  }, []);
  const navigate = useNavigate()

  const token = getLocal('authtoken')
  const decoded = jwtDecode(token);
  
  const[premium,setPremium]=useState(false)

 
  useEffect(()=>{
    if(decoded.is_premium){
      
      setPremium(true)
      navigate('/success')
    }
    if (premium == true) {
      setPremium(true)
      navigate('/success')
      
    }
  },[])

  const [Razorpay] = useRazorpay();

  const complete_payment = (payment_id, order_id, signature) => {
    axios
      .post(`${BACKEND_BASE_URL}/api/subscription/complete/${decoded.user_id}/`, {
        "payment_id": payment_id,
        "order_id": order_id,
        "signature": signature,
        "amount": amount,
        "duration": duration,
        "currency": 'INR',

      })
      .then((response) => {
        console.log(response.data);
        setPremium(true)
      })
      .catch((error) => {
        console.log(error.response);
      });
  };


  const razorpayPayment = () => {

    axios
      .post(`${BACKEND_BASE_URL}/api/subscription/create/${decoded.user_id}/`, {
        // "payment_id": payment_id,
        // "order_id": order_id,
        // "signature": signature,
        "amount": amount,
        "duration": duration,
        "currency": 'INR',
        
      }, {

      })
      .then(function (response) {
        console.log(response.data.data);
        const order_id = response.data.data.id;

        const options = {
          key: RAZORPAY_KEY,
          name: 'VerbVoyage',
          description: 'VIP membership upgrade',
          image: logoImage,
          order_id: order_id,
          handler: function (response) {
            complete_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: 'verbvoyage',
            email: 'violet.store.she@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Talki Team',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          setLoading(false);
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#FFEA00]">Choose Your Subscription Plan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#FFEA00]">{plan.name}</h2>
              <p className="text-gray-400 mb-4">{plan.desc}</p>
              <p className="text-2xl font-semibold text-[#FFEA00]">${plan.price}</p>
              <button
                onClick={() => handleSubscribe(plan)}
                className="mt-6 bg-[#FFEA00] hover:bg-yellow-500 text-black py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12">

          <Link to="/userhome">
            <button className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black text-sm py-2 px-6 w-full focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700">
              Back to Home
            </button>
          </Link>
        </div>


      </div>
    </div>
  );
}

export default VipPay;