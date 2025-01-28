// this page for login and register 

import { createClient } from "@/app/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);
  return (
    <div>Account</div>
  )
}

