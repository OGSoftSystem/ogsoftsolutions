// import UsersTable from "@/components/shared/UsersTable";

import { Metadata } from "next";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import UsersTable from "./_components/UsersTable";
import { UserSchemaType } from "@/type/type";
import { cachedUsers } from "@/lib/cache";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = async () => {
  const users: UserSchemaType[] = await cachedUsers();

  if (!users.length) return null;

  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <PageHeadingText title="Users" description="All registered users." />
        <div className="lg:max-w-5xl mx-auto flex flex-col justify-center">
          {/* <UsersTable users={users} /> */}

          {/* <AddIcon
            href={"/auth/sign-up"}
            title="Add User"
            className="self-end mb-6"
          /> */}

          <UsersTable users={users} />
        </div>
      </MaxWidthContainer>
    </section>
  );
};

export default UsersPage;
