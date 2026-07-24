/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";

interface PrintingServicesProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote?: (serviceName: string) => void;
  initialCategory?: string;
}

export default function PrintingServices({ setCurrentPage }: PrintingServicesProps) {
  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]);

  return null;
}
