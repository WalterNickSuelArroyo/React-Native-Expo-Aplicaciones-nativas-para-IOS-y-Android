export const BasicTypes = () => {

    const name: string = 'Fernando';
    const age: number = 38;
    const isActive: boolean = false;

    const powers = ['Velocidad', 'Volar', 'Respirar en el agua'];
  return (
    <>
        <h3>Tipos basicos</h3>
        {name} - {age} - {isActive ? 'Activo' : 'No activo'}
        <p>{powers.join(', ')}</p>
    </>
  )
}
