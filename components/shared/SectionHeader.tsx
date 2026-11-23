interface SectionHeaderProps {
  title: string;
  description?: string;
  as?: "h1" | "h2";
}

export function SectionHeader({
  title,
  description,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Tag className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</Tag>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
      {description && (
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
