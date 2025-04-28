
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    clearCart();
    
    if (sessionId) {
      const updateOrderStatus = async () => {
        const { error } = await supabase
          .from("orders")
          .update({ status: "processing" })
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error updating order status:", error);
          toast({
            title: "Error",
            description: "There was a problem updating your order status.",
            variant: "destructive",
          });
        }
      };

      updateOrderStatus();
    }
  }, [clearCart, sessionId, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/profile")}
              variant="default"
              className="bg-digital-blue hover:bg-digital-darkBlue"
            >
              View Order History
            </Button>
            <Button 
              onClick={() => navigate("/products")}
              variant="outline"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
