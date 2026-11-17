import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { VisitInformation } from "@/components/sections/VisitInformation";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "View PAHINA's concept location, opening hours, contact, and social media placeholders ready for final neighborhood launch details.",
};

export default function VisitPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Pull up <em className="font-normal italic">a chair.</em>
          </>
        }
        description="PAHINA is currently an editorial café portfolio concept. The structured visit placeholders below are ready to be updated once a real street address, opening schedule, and contact lines are confirmed."
      />

      <VisitInformation />
    </>
  );
}
