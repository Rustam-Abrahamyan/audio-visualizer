function Spectrum() {
    let spectrumMaxExponent = 5;
    let spectrumMinExponent = 3;
    let spectrumHeight = 255;

    let spectrum = {
        GetVisualBins: function (dataArray, numElements, SpectrumStart, SpectrumEnd) {
            let SpectrumBarCount = numElements;
            let SamplePoints = [];
            let NewArray = [];
            let LastSpot = 0;

            for (let i = 0; i < SpectrumBarCount; i++) {
                let Bin = Math.round(SpectrumEase(i / SpectrumBarCount) * (SpectrumEnd - SpectrumStart) + SpectrumStart);
                if (Bin <= LastSpot) {
                    Bin = LastSpot + 1;
                }
                LastSpot = Bin;
                SamplePoints[i] = Bin;
            }

            let MaxSamplePoints = [];

            for (let i = 0; i < SpectrumBarCount; i++) {
                let CurSpot = SamplePoints[i];
                let NextSpot = SamplePoints[i + 1];
                if (NextSpot == null) {
                    NextSpot = SpectrumEnd;
                }

                let CurMax = dataArray[CurSpot];
                let MaxSpot = CurSpot;
                let Dif = NextSpot - CurSpot;
                for (let j = 1; j < Dif; j++) {
                    let NewSpot = CurSpot + j;
                    if (dataArray[NewSpot] > CurMax) {
                        CurMax = dataArray[NewSpot];
                        MaxSpot = NewSpot;
                    }
                }
                MaxSamplePoints[i] = MaxSpot;
            }

            for (let i = 0; i < SpectrumBarCount; i++) {
                let NextMaxSpot = MaxSamplePoints[i];
                let LastMaxSpot = MaxSamplePoints[i - 1];
                if (LastMaxSpot == null) {
                    LastMaxSpot = SpectrumStart;
                }
                let LastMax = dataArray[LastMaxSpot];
                let NextMax = dataArray[NextMaxSpot];

                NewArray[i] = (LastMax + NextMax) / 2;
                if (isNaN(NewArray[i])) {
                    NewArray[i] = 0;
                }
            }

            return exponentialTransform(NewArray);
        }
    };

    function exponentialTransform(array) {
        let newArr = [];
        for (let i = 0; i < array.length; i++) {
            let exp = spectrumMaxExponent + (spectrumMinExponent - spectrumMaxExponent) * (i / array.length);
            newArr[i] = Math.max(Math.pow(array[i] / spectrumHeight, exp) * spectrumHeight, 1);
        }
        return newArr;
    }

    function SpectrumEase(v) {
        return Math.pow(v, 2.55);
    }

    return spectrum;
}

export default Spectrum;
