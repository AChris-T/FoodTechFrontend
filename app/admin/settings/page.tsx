"use client";

import PageHeader from "../../components/ui/PageHeader";
import PlatformInfo from "../../components/settings/PlatformInfo";
import QuickLinks from "../../components/settings/QuickLinks";
import SignOutCard from "../../components/settings/SignOutCard";

export default function SettingsPage() {
  return (
    <div className="admin-font bg-[#F5F7F5] min-h-screen p-4 sm:p-6 lg:p-8 max-w-2xl">
      <PageHeader
        title="Settings"
        subtitle="Platform configuration and account options."
      />
      <div className="space-y-4">
        <PlatformInfo />
        <QuickLinks />
        <SignOutCard />
      </div>
    </div>
  );
}
