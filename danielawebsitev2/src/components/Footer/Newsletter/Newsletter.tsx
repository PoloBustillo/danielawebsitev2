import NewCard from "@/components/Newest/NewCard";
import NewCardSkeleton from "@/components/Skeletons/NewCardSkeleton";
import { WithSkeleton } from "@/components/WithSkeleton";
import { getBannerImages } from "@/lib/api";
import { BannerResponse } from "@/lib/types";

const Newsletter = async () => {
  const banners = (await getBannerImages()) as BannerResponse[];
  return (
    <section className="mx-[5vw] max-w-[90vw] top-28 relative">
      <div id="join-section" className="-mt-30 relative z-10">
        <div className="mx-auto max-w-2xl py-16 md:py-24 px-4 sm:px-6 md:max-w-7xl lg:px-24 dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500     bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 rounded-lg bg-newsletter">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
            <div className=" flex flex-col justify-evenly">
              <div>
                <h3 className="text-5xl dark:text-background text-[whitesmoke] font-bold mb-3">
                  Lo último de mi blog.
                </h3>
                <h4 className="text-lg font-medium mb-7 dark:text-background text-neutral-300">
                  Subscribete para recibir promociones y técnicas terapeuticas.
                </h4>
              </div>
              <div className="flex -2">
                <input
                  type="email"
                  name="q"
                  className="py-4 text-sm w-full text-background bg-foreground rounded-md pl-4 mr-4"
                  placeholder="Tu email..."
                  autoComplete="off"
                />
                <button
                  role="button"
                  className="  bg-background dark:hover:bg-[whitesmoke] dark:hover:text-background text-current font-medium py-2 px-4 rounded"
                >
                  Subscribete
                </button>
              </div>
            </div>
            <div>
              <div className="h-full flex items-center justify-center gap-x-4">
                <NewCard banners={banners} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
