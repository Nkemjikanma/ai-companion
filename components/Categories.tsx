"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = {
      categoryId: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const categories = data.map((data) => (
    <button
      key={data.id}
      onClick={() => onClick(data.id)}
      className={cn(
        `flex 
        items-center 
        text-center 
        text-xs 
        md:text-sm 
        px-2 
        md:px-4 
        py-2 
        md:py-3 
        rounded-md 
        bg-primary/10 
        hover:opacity-75 
        transition`,
        data.id === categoryId && "bg-primary/25"
      )}
    >
      {data.name}
    </button>
  ));
  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        className={cn(
          `flex 
        items-center 
        text-center 
        text-xs 
        md:text-sm 
        px-2 
        md:px-4 
        py-2 
        md:py-3 
        rounded-md 
        bg-primary/10 
        hover:opacity-75 
        transition`,
          !categoryId && "bg-primary/25"
        )}
        onClick={() => onClick(undefined)}
      >
        Newest
      </button>
      {categories}
    </div>
  );
};

export default Categories;
