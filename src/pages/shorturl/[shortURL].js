export default function ShortURLPage() {
  return <div>ShortURL Redirect</div>;
}

export async function getServerSideProps({ params }) {
  const { shortURL } = params;

  // Fetch the long URL from the supabase
  const longURL = await fetch(
    `https://lwcehdpteppgotsedvhm.supabase.co/rest/v1/cut_url?short_url=eq.${shortURL}&select=url`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => result);

  // If no long URL is found, redirect to the homepage
  if (!longURL) {
    return {
      redirect: { destination: "/" },
    };
  }

  // Redirect to the long URL
  return {
    redirect: {
      destination: longURL[0].url,
    },
  };
}
