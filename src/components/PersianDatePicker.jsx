import { Datepicker } from "@ijavad805/react-datepicker";
export default function PersianDatePicker({ onDateSelect }) {
  const handleDateSelect = (selectedDate) => {
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };
  return (
    <div dir="rtl" className="text-left mr-auto w-100">
      <Datepicker
        footer={(moment, setValue) => {
          return (
            <>
              <div
                onClick={() => {
                  if (setValue) setValue(moment());
                }}
              >
                امروز
              </div>
            </>
          );
        }}
        closeWhenSelectADay={true}
        disabled={false}
        format={"YYYY/MM/DD"}
        input={<input placeholder="" />}
        lang={"fa"}
        loading={false}
        modeTheme={"dark"}
        theme={"blue"}
        adjustPosition={"auto"}
        onChange={handleDateSelect}
      />
    </div>
  );
}
