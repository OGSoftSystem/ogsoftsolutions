import { Metadata } from "next";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import EmailTable from "./_components/EmailTable";
import { fetchNewLettersEmails } from "@/lib/actions/news-letter.action";
import { cachedNewLetterEmails } from "@/lib/cache";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = async () => {
  const email: { _id: string; email: string }[] = await cachedNewLetterEmails();

  if (!email.length) return null;

  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <PageHeadingText
          title="News Letter Emails"
          description="All News Leter Emails"
        />
        <div className="lg:max-w-5xl mx-auto flex flex-col justify-center">
          <EmailTable emails={email} />
        </div>
      </MaxWidthContainer>
    </section>
  );
};

export default UsersPage;
