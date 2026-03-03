"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all rounded-2xl group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold text-blue-950">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-4 border-t border-gray-50 mt-4">
          <div className="flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium text-xs">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            Income
          </div>
          <div className="flex items-center px-2 py-1 rounded-full bg-red-50 text-red-700 font-medium text-xs">
            <ArrowDownRight className="mr-1 h-3 w-3" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
