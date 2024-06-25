"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../common/ErrorFallback";
import Tab from "../common/tabs/Tab";
import TextTab from "../common/tabs/TextTab";
import ProgramList from "./ProgramList";
import ProgramListLoader from "./ProgramList.loader";
import MAIN from "@/constants/MAIN";
import PROGRAM from "@/constants/PROGRAM";
import { AccessType } from "@/types/access";
import { ProgramCategoryWithAll, ProgramStatus } from "@/types/program";

const ProgramContext = createContext(null);

const parseQuery = (searchParams: URLSearchParams) => ({
  category: (searchParams.get("category") as ProgramCategoryWithAll) ?? "all",
  status: (searchParams.get("status") as ProgramStatus) ?? "active",
  page: searchParams.get("page") ?? "1",
});

//wrapper
interface ProgramWrapperProps {
  children: React.ReactNode;
}

const ProgramWrapper = ({ children }: ProgramWrapperProps) => {
  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(MAIN.DEFAULT_QUERY);

  useEffect(() => {
    setQueryValue({
      ...MAIN.DEFAULT_QUERY,
      category: parseQuery(searchParams).category,
    });
  }, [searchParams]);

  useEffect(() => {
    window.history.replaceState(
      {},
      "",
      `?category=${queryValue.category}&status=${queryValue.status}&page=${queryValue.page}`,
    );
  }, [queryValue]);

  const handleSetCategory = (category: ProgramCategoryWithAll) => {
    setQueryValue({
      ...queryValue,
      category,
      page: "1",
    });
  };

  const handleSetStatus = (status: ProgramStatus) => {
    setQueryValue({
      ...queryValue,
      status,
      page: "1",
    });
  };

  const handleSetPage = (page: number) => {
    setQueryValue({
      ...queryValue,
      page: page.toString(),
    });
  };

  return (
    <ProgramContext.Provider
      value={{ queryValue, handleSetCategory, handleSetStatus, handleSetPage }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

//children

const CategoryTab = () => {
  const { queryValue, handleSetCategory } = useContext(ProgramContext);

  return (
    <Tab<ProgramCategoryWithAll>
      options={Object.values(PROGRAM.CATEGORY_TAB_WITH_ALL)}
      selected={queryValue.category}
      onItemClick={(v) => handleSetCategory(v)}
      size="lg"
      baseColor="white"
      pointColor="navy"
      align="line"
    />
  );
};

const StatusTab = () => {
  const { queryValue, handleSetStatus } = useContext(ProgramContext);

  return (
    <TextTab<ProgramStatus>
      options={Object.values(PROGRAM.STATUS_TAB)}
      selected={queryValue.status}
      onClick={(v) => handleSetStatus(v)}
    />
  );
};

interface ContentProps {
  contentType: AccessType;
}
const Content = ({ contentType }: ContentProps) => {
  const { queryValue, handleSetPage } = useContext(ProgramContext);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ProgramListLoader />}>
        <ProgramList
          category={queryValue.category}
          programStatus={queryValue.status}
          page={+queryValue.page}
          setPage={handleSetPage}
          contentType={contentType}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

ProgramWrapper.CategoryTab = CategoryTab;
ProgramWrapper.StatusTab = StatusTab;
ProgramWrapper.Content = Content;

export default ProgramWrapper;
