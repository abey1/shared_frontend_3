import { Button } from "@relume_io/relume-ui";
import { useNavigate } from "react-router-dom";

export function Cta51({ partnerPath = "/for-companies" } = {}) {
  const navigate = useNavigate();

  return (
    <section id="cta51" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center border border-border-primary p-8 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Ready to rent or partner
            </h2>
            <p className="md:text-md">
              Find the right tools from established businesses or list your
              equipment today
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button title="Browse" onClick={() => navigate("/all-tools")}>
              Browse
            </Button>
            <Button
              title="Partner"
              variant="secondary"
              onClick={() => navigate(partnerPath)}
            >
              Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
