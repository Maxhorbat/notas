import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqnyqybiqazkjkyvxwse.supabase.co'
const supabaseKey = 'sb_publishable_lswy6fkcenCt6YCQBpUTcg_pJ1bFpfn'

export const supabase = createClient(supabaseUrl, supabaseKey)
import { supabase } from './supabaseClient.js'

async function obtenernotas() {
  const { data, error } = await supabase
    .from('notas')
    .select('*')

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Datos:', data)
    // Aquí renderizas los datos en tu HTML
  }
}

obtenernotas()