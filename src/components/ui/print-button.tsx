"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button className="button button-primary print-button" type="button" onClick={() => window.print()}>
      <Printer size={17} aria-hidden="true" />
      Print / Save as PDF
    </button>
  );
}
