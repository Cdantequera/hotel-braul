import { useState, useEffect } from 'react';
import { Calendar, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'; // Agregamos unos íconos para darle estilo

const BookingForm = ({ room, onSubmitBooking }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [nights, setNights] = useState(0);

  // Efecto para calcular precio y noches
  useEffect(() => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const diffTime = endDate - startDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        setTotalPrice(diffDays * room.price);
        setError('');
      } else {
        setNights(0);
        setTotalPrice(0);
        setError('La fecha de salida debe ser posterior a la entrada.');
      }
    }
  }, [checkIn, checkOut, room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError('Selecciona tus fechas.');
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) return;

    onSubmitBooking({ room: room._id, checkIn, checkOut, totalPrice });
  };

  const today = new Date().toISOString().split('T')[0];

  // Estilos comunes para los inputs
  const inputWrapperStyle = "flex items-center bg-black/50 border border-white/10 rounded-lg p-3 focus-within:border-[#C5A572] transition-colors";
  const inputStyle = "bg-transparent border-none text-white w-full focus:ring-0 outline-none text-sm pl-3";
  const labelStyle = "block text-xs font-bold text-[#C5A572] uppercase tracking-widest mb-2";

  return (
    // 1. CONTENEDOR PRINCIPAL OSCURO CON BORDE DORADO SUAVE
    <div className="bg-zinc-900/80 backdrop-blur-md border border-[#C5A572]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(197,165,114,0.1)] sticky top-28">
      
      {/* Título y Precio */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Reservar Estadía</h3>
        <p className="text-gray-400 flex items-baseline">
          <span className="font-serif text-3xl font-bold text-[#C5A572] mr-2">${room?.price || 0}</span>
          <span className="text-sm uppercase tracking-wider">/ noche</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Inputs de Fecha Lado a Lado */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className={labelStyle}>Llegada</label>
                <div className={inputWrapperStyle}>
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <input
                        type="date"
                        value={checkIn}
                        min={today}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className={inputStyle}
                        required
                        style={{ colorScheme: 'dark' }} // IMPORTANTE: Hace el calendario del navegador oscuro
                    />
                </div>
            </div>
            <div>
                <label className={labelStyle}>Salida</label>
                <div className={inputWrapperStyle}>
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn || today}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={inputStyle}
                        required
                        style={{ colorScheme: 'dark' }}
                    />
                </div>
            </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="flex items-center text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-pulse">
            <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
            {error}
          </div>
        )}

        {/* Resumen del Total */}
        {totalPrice > 0 && (
          <div className="bg-black/50 p-6 rounded-xl border border-[#C5A572]/20 space-y-3">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>${room.price} x {nights} noches</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm border-b border-white/10 pb-3">
              <span>Impuestos y tasas</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-white uppercase tracking-wider flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-[#C5A572]"/> Total
              </span>
              <span className="text-2xl font-serif font-bold text-[#C5A572]">${totalPrice}</span>
            </div>
          </div>
        )}

        {/* Botón Dorado */}
        <button
          type="submit"
          className="w-full py-4 bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] text-black font-bold uppercase tracking-[0.2em] rounded-sm shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
          disabled={!!error || totalPrice === 0}
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Confirmar Reserva
        </button>
        
        <p className="text-center text-gray-500 text-xs">No se cobrará nada hasta confirmar la disponibilidad.</p>
      </form>
    </div>
  );
};

export default BookingForm;