export default function ErrorMessage() {
    return (
      <div className="p-10 text-center border-2 border-dashed border-red-200 rounded-2xl bg-red-50 text-red-600">
        <h2 className="font-bold text-xl">Template Mismatch</h2>
        <p>The data provided does not match the Simple Online Catalogue template.</p>
      </div>
    );
  }