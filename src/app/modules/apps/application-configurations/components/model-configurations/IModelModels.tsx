import { Dto } from "../../../../../models/application_model"

export type StepProps = {
    data: Dto
    updateData: (fieldsToUpdate: Partial<Dto>) => void
    hasError: boolean
}