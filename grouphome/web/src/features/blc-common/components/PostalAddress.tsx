import { CommonInput } from '@/components/elements/common/CommonInput';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Get, Post } from '@/features/blc-common/utils/ServerRequest';
import {
    PostalAddressSearch as ApiPathPostalAddressSearch,
    Select as ApiPathSelect,
} from '@/features/blc-common/assets/ApiPath';
import { handleFocusTab } from '@/components/elements/common/CommonUtils';

interface PostalAddressProps {
    onChange?: (data: any) => void;
    register?: any;
    errors?: any;
    formData: any;
    isMatchedTown?: Dispatch<SetStateAction<boolean>>
    isLoaded?: Dispatch<SetStateAction<boolean>>
    opts?: {
        showLabel?: boolean;
        disabled?: boolean;
        showPostNo?: boolean;
        showPref?: boolean;
        showCity?: boolean;
        showTown?: boolean;
        showPlaceHolder?: boolean;
        className?: string;
    }
}

interface Option {
    name: string;
    value: string | null;
}

let selPrefList: Option[] = [];

export const PostalAddress = ({
    onChange,
    register,
    errors,
    formData: externalFormData,
    isMatchedTown,
    isLoaded,
    opts = {
        showLabel: true,
        disabled: false,
        showPostNo: true,
        showPref: true,
        showCity: true,
        showTown: true,
        showPlaceHolder: true,
        className: 'relative mb-[0.5em] mt-[1em] px-[0.5em] py-[1em] border-[1px] border-[#EE887A] rounded-[5px] text-gray-700',
    }
}: PostalAddressProps) => {
    const [loaded, setLoaded] = useState(false);
    const [selFirstTimeLoaded, setSelFirstTimeLoaded] = useState(false);
    const [selPref, setSelPref] = useState<Option[]>([]);
    const [selCity, setSelCity] = useState<Option[]>([]);
    const [selTown, setSelTown] = useState<string[]>([]);
    const [disabledPref, setDisabledPref] = useState(false);
    const [disabledCity, setDisabledCity] = useState(true);
    const [formData, setFormData] = useState({
        postNo1st: '',
        postNo2nd: '',
        postNo: '',
        prefId: '',
        city: '',
        town: '',
    });

    // Function to handle input changes
    const handleInputChange = async (e: any) => {
        setSelFirstTimeLoaded(false);
        const { name, value, maxLength } = e.target;

        const updatedData = { ...formData, [name]: value };
        const postNo = `${updatedData.postNo1st}${updatedData.postNo2nd}`;
        const updatedFormData = { ...updatedData, postNo: postNo };

        setFormData(updatedFormData);

        // If the first 3 characters are entered, call API to get the list of prefectures and cities
        if (name === 'postNo1st') {
            if (value.length === 3) {
                if (formData.postNo2nd.length === 4) {
                    handlePostNoSearch(postNo);
                } else {
                    handlePostNoSearch(value); // Don't search for full information
                }
            } else if (value.length < 3) {
                // Reset the list if there are not enough characters
                resetSelections();
            }
        }

        // If 7 characters are entered (full postal code), call API to get full information
        if (name === 'postNo2nd' && (postNo.length === 7 || updatedData.postNo1st.length === 3)) {
            await handlePostNoSearch(postNo);
        }

        if (name === 'prefId' && value !== '') {
            await handlePrefSearch(selPref[value]?.name);
        }

        if (name === 'town') {
            if (value.length > 0) {
                handleTownChange(selTown, value);
            } else {
                isMatchedTown && isMatchedTown(true);
            }
        }

        // Handle focus tab
        if (e.target.value.length === maxLength) {
            handleFocusTab('next');
        } else if (e.target.value.length === 0) {
            handleFocusTab('prev');
        }
    };

    const getSuccessPrefSearch = (res: any) => {
        const data = res.data.data;

        // Get the list of prefectures and cities
        const cityList: string[] = Array.from(
            new Set(data.map((item: any) => item.city)),
        );

        const townList: string[] = Array.from(
            new Set(data.map((item: any) => item.town)),
        );

        // Update the list of cities
        setSelCity(
            cityList.map((cityName: string) => ({ name: cityName, value: cityName })),
        );
        setDisabledCity(cityList.length === 0);

        if (cityList.length === 1) {
            const selectedCity = cityList[0];
            setFormData((prev) => ({
                ...prev,
                city: selectedCity,
            }));
        }

        handleTownChange(townList, formData.town);
        setLoaded(true);
    }
    const handlePrefSearch = async (pref: string) => {
        if (!pref || pref.trim().length === 0) {
            return;
        }

        return Get({
            apiPath: ApiPathPostalAddressSearch,
            params: { params: { pref } },
            onSuccess: getSuccessPrefSearch
        });
    };

    const getSuccessPostNoSearch = (res: any, params: any) => {
        const data = res.data.data;
        if (params.params.postNo.length < 4 && data.length === 0) {
            resetSelections();
            return;
        }

        const prefectures = selPrefList ? selPrefList : selPref;

        // Get the list of prefectures and cities
        const prefList: string[] = Array.from(
            new Set(data.map((item: any) => item.pref)),
        );
        const cityList: string[] = Array.from(
            new Set(data.map((item: any) => item.city)),
        );

        const townList: string[] = Array.from(
            new Set(data.map((item: any) => item.town)),
        );

        setSelTown(townList);

        // Create a new list from prefList, get the value from selPref based on name
        const newPrefList = prefList.map((prefName: string) => {
            const matchingPref = prefectures.find(
                (pref: Option) => pref.name === prefName,
            );
            return {
                name: prefName,
                value: matchingPref ? matchingPref.value : null,
            };
        });

        const updatedPref = prefectures.map((pref: Option) => {
            const isPrefInList = prefList.includes(pref.name);
            return {
                ...pref,
                disabled: !isPrefInList,
            };
        });

        setSelPref(updatedPref);

        // Update the list of cities
        setSelCity(
            cityList.map((cityName: string) => ({
                name: cityName,
                value: cityName,
            })),
        );
        if (cityList.length === 0 && formData.city.length > 0) {
            setSelCity([{ name: formData.city, value: formData.city }]);
        }
        setDisabledCity(cityList.length === 0);
        if (cityList.length === 1) {
            const selectedCity = cityList[0];
            setFormData((prev) => ({
                ...prev,
                city: selectedCity,
            }));
        }

        // Automatically select if there's only 1 result for prefecture and city
        if (newPrefList.length === 1) {
            const selectedPref = newPrefList[0];
            setFormData((prev) => ({
                ...prev,
                prefId: selectedPref.value || '',
            }));
        }

        handleTownChange(townList, formData.town);
        setLoaded(true);
        return data;
    }

    const handlePostNoSearch = async (postNo: string) => {
        if (postNo.length === 0) {
            return;
        }
        Get({
            apiPath: ApiPathPostalAddressSearch,
            params: { params: { postNo } },
            onSuccess: getSuccessPostNoSearch,
        });
        return;
    };
    const handleTownChange = (townList: string[], town: string) => {
        setFormData((prev) => ({
            ...prev,
            town: town,
        }));
        if (townList.length > 0) {
            let selectedTown = town;
            if (townList.length === 1 && !town) {
                selectedTown = townList[0];
                if (!selFirstTimeLoaded) {
                    formData.town = selectedTown;
                }
                setFormData((prev) => ({
                    ...prev,
                    town: formData.town,
                }));
                isMatchedTown && isMatchedTown(true);
            }
            if (selectedTown) {
                isMatchedTown && isMatchedTown(townList.some((town) => selectedTown.startsWith(town)));
            }
            return
        }
        if (!town) {
            isMatchedTown && isMatchedTown(true);
        }
    }

    // Function to reset selection lists
    const resetSelections = () => {
        const newSelPref = selPrefList.map((pref: Option) => ({ ...pref, disabled: false }));
        setSelPref(newSelPref);
        setSelCity([]);
        setFormData((prev) => ({
            ...prev,
            prefId: '',
            city: '',
            town: formData.town || '',
        }));
        setDisabledPref(false);
        setDisabledCity(true);
    };

    const postSuccessInitialData = (res: any, param: any) => {
        const originalPrefData = res.data.prefectures.map((pref: any) => ({
            name: pref.name,
            value: pref.value,
        }));

        selPrefList = originalPrefData;
        setSelPref(originalPrefData); // Update selOriginalPref state
        if (externalFormData) {
            const { postNo, prefId, city, town } = externalFormData;
            const newPostNo = postNo?.replace('-', '');

            // Handle postNo field em
            if (newPostNo?.length < 1) {
                const prefName = originalPrefData.find((pref: Option) => pref.value == prefId)?.name;
                handlePrefSearch(prefName);
            }

            setFormData((prev) => ({
                ...prev,
                postNo1st: newPostNo?.substring(0, 3) ?? '',
                postNo2nd: newPostNo?.substring(3) ?? '',
                postNo: newPostNo,
                prefId,
                city,
                town,
            }));
        }
        setLoaded(true);
    }
    // Get the list of prefectures when the component mounts
    useEffect(() => {
        const fetchInitialData = async () => {
            Post({
                apiPath: ApiPathSelect,
                params: { type: ['prefectures'] },
                onSuccess: postSuccessInitialData
            });
            setSelFirstTimeLoaded(true);
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (formData.postNo1st.length === 3) {
            handlePostNoSearch(`${formData.postNo1st}${formData.postNo2nd}`);
        }
    }, [formData.postNo]);

    // Use useEffect to propagate changes to the parent component
    useEffect(() => {
        if (onChange) {
            onChange(formData);
            if (loaded)
                isLoaded && isLoaded(true);
        }
    }, [formData, onChange, loaded]);

    return (
        <div className={opts.className}>
            <div className={`flex flex-wrap w-full mt-2`}>
                <div className="w-1/12 px-1 flex items-center">
                    <span>〒</span>
                </div>
                <div className="postNo1st">
                    <CommonInput
                        // id="postNo1st"
                        name="postNo1st"
                        {...register('postNo1st')}
                        value={formData.postNo1st}
                        className={`w-full ${errors?.postNo1st ? 'error-background' : ''}`}
                        onChange={handleInputChange}
                        maxLength={3}
                    />
                </div>
                <div className="px-1 flex items-center justify-center">
                    <span>-</span>
                </div>
                <div className="postNo2nd">
                    <CommonInput
                        // id="postNo2nd"
                        name="postNo2nd"
                        {...register('postNo2nd')}
                        value={formData.postNo2nd}
                        className={`w-full ${errors?.postNo2nd ? 'error-background' : ''}`}
                        onChange={handleInputChange}
                        maxLength={4}
                    />
                </div>
            </div>
            <div className="flex flex-wrap w-full mb-1">
                <div className="w-1/12 px-1 flex items-center">
                    <span></span>
                </div>
                <div className="w-3/12 px-1">
                    {errors?.postNo1st && (
                        <span className="error-message">{errors.postNo1st.message}</span>
                    )}
                </div>
                <div className="w-1/12 px-1 flex items-center justify-center">
                    <span></span>
                </div>
                <div className="w-3/12 px-1">
                    {errors?.postNo2nd && (
                        <span className="error-message">{errors.postNo2nd.message}</span>
                    )}
                </div>
                <div className="w-full px-1">{errors?.postNoCombined && (<span className="error-message">{errors.postNoCombined.message}</span>)}</div>
            </div>

            <div className="flex flex-wrap w-full mb-2">
                <div className="pref px-1">
                    <CommonSelect
                        // id="prefId"
                        title={opts?.showLabel ? '所在地' : ''}
                        name="prefId"
                        {...register('prefId')}
                        placeholder={opts?.showPlaceHolder ? '都道府県' : ''}
                        options={selPref}
                        value={formData.prefId}
                        disabled={disabledPref}
                        onChange={handleInputChange}
                        className={`w-full ${errors?.prefId ? 'error-background' : ''}`}
                    />
                    {errors?.prefId && (
                        <span className="error-message">{errors.prefId.message}</span>
                    )}
                </div>
                <div className="city px-1">
                    <CommonSelect
                        // id="city"
                        title={opts?.showLabel ? '市区町村' : ''}
                        name="city"
                        {...register('city')}
                        placeholder={opts?.showPlaceHolder ? '市区町村' : ''}
                        options={selCity}
                        value={formData.city}
                        disabled={disabledCity}
                        onChange={handleInputChange}
                        className={`w-full ${errors?.city ? 'error-background' : ''}`}
                    />
                    {errors?.city && (
                        <span className="error-message">{errors.city.message}</span>
                    )}
                </div>
                <div className="w-2/4 px-1">
                    <CommonInput
                        // id="town"
                        name="town"
                        {...register('town')}
                        title={opts?.showLabel ? '市区町村以下' : ''}
                        placeholder={opts?.showPlaceHolder ? '市区町村以下' : ''}
                        value={formData.town}
                        className={`w-full ${errors?.town ? 'error-background' : ''}`}
                        onChange={handleInputChange}
                    />
                    {errors?.town && (
                        <span className="error-message">{errors.town.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
