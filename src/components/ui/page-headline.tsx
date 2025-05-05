"use client";

interface PageHeadlineProps {
  title: string;
  subtitle?: string;
}

const PageHeadline = ({ title, subtitle }: PageHeadlineProps) => {
  return (
    <div className={`mb-2 text-start font-mono`}>
      <h2 className="text-2xl font-semibold tracking-wider text-brand-blue">
        {title}
      </h2>
      <h3 className="text-sm font-light text-neutral-800 dark:text-neutral-400">
        {subtitle}
      </h3>
    </div>
  );
};
export default PageHeadline;
