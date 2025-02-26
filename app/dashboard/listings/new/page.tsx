import AddListing from "@/components/listings/AddListing";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Listing Management</h1>
      <p className="text-lg text-gray-600 mb-6">Add new hotel or restaurant listings.</p>
      <AddListing />
    </div>
  );
}
