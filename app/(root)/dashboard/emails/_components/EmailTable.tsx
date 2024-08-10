"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmailTable = ({
  emails,
}: {
  emails: { _id: string; email: string }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((email, i) => {
          let sn = i + 1;
          return (
            <TableRow key={email._id}>
              <TableCell>{sn}</TableCell>
              <TableCell>{email.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EmailTable;
