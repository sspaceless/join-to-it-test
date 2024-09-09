import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { Input } from "~/shared/ui/kit";

export type EditEventFormValues = {
  name?: string;
  date?: string;
  time?: string;
  notes?: string;
};

export const EditEventForm: React.FC<{
  initialValues?: EditEventFormValues;
  onCancel: () => void;
  onSubmit: (data: EditEventFormValues) => void;
}> = ({ initialValues, onCancel, onSubmit }) => {
  const defaultEditEventFormValues = {
    name: initialValues?.name ?? "New event",
    date: initialValues?.date ?? dayjs().format("YYYY-MM-DD"),
    time: initialValues?.time ?? dayjs().format("HH:mm"),
    notes: initialValues?.notes ?? "",
  } satisfies EditEventFormValues;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<EditEventFormValues>({ defaultValues: defaultEditEventFormValues });

  return (
    <div className="flex flex-col gap-[30px] py-[25px]">
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          maxLength: 30,
        }}
        render={({ field }) => <Input type="text" placeholder="event name" required {...field} />}
      />

      <Controller
        name="date"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => <Input type="date" placeholder="event date" required {...field} />}
      />

      <Controller
        name="time"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => <Input type="time" placeholder="event time" required {...field} />}
      />

      <Controller
        name="notes"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => <Input placeholder="event notes" {...field} />}
      />

      <div className="flex flex-row justify-between font-sans text-[12px] font-light">
        <button className="text-[#FF5F5F]" onClick={onCancel}>
          Cancel
        </button>
        <button className="text-[#6A6996]" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Save
        </button>
      </div>
    </div>
  );
};
