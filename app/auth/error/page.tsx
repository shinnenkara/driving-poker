import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Sorry, something went wrong.
          </CardTitle>
        </CardHeader>
        <CardContent>
          {params?.error ? (
            <p className="text-sm text-muted-foreground">
              Code error: {params.error}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              An unspecified error occurred.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
