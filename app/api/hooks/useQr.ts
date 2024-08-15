import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";
import { RefObject, useEffect, useMemo, useState } from "react";
import { connection } from "@/app/lib/constants";

export const useQr = ({
  address,
  qrRef,
}: //   qrRef,
{
  address: string;
  qrRef: RefObject<HTMLDivElement>;
}) => {
  const [qr, setQr] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const recipent = new PublicKey(address);
    const amount = new BigNumber(0.1);
    const url = encodeURL({
      recipient: recipent,
      amount: amount,
      label: "Payment Service",
    });
    console.log("URL", url);
    const qrCode = createQR(url, 400, "transparent");
    setQr(qrCode);
    console.log("QR --->", qrCode);
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
    const qrElement = document.getElementById("qr-code");
    if (qrElement) {
      qrElement.innerHTML = "";
      qrCode.append(qrElement);
    }
    setLoading(false);
  }, [connection, address]);
  return { qr, loading };
};
